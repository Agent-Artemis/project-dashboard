import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function oauthSign(method: string, url: string, params: Record<string, string>) {
  const consumerSecret = process.env.X_CONSUMER_SECRET || "";
  const tokenSecret = process.env.X_ACCESS_TOKEN_SECRET || "";

  const paramStr = Object.keys(params)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");

  const base = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(paramStr)}`;
  const key = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
  return crypto.createHmac("sha1", key).update(base).digest("base64");
}

function buildAuthHeader(method: string, url: string, extraParams: Record<string, string> = {}) {
  const oauth: Record<string, string> = {
    oauth_consumer_key: process.env.X_CONSUMER_KEY || "",
    oauth_nonce: crypto.randomUUID().replace(/-/g, ""),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: process.env.X_ACCESS_TOKEN || "",
    oauth_version: "1.0",
  };

  const allParams = { ...oauth, ...extraParams };
  oauth.oauth_signature = oauthSign(method, url, allParams);

  return (
    "OAuth " +
    Object.keys(oauth)
      .sort()
      .map((k) => `${encodeURIComponent(k)}="${encodeURIComponent(oauth[k])}"`)
      .join(", ")
  );
}

export async function GET() {
  const userId = process.env.X_USER_ID;
  if (!userId || !process.env.X_CONSUMER_KEY) {
    return NextResponse.json({ error: "X API not configured" }, { status: 500 });
  }

  try {
    // Get user info (followers)
    const userUrl = `https://api.twitter.com/2/users/${userId}`;
    const userParams = { "user.fields": "public_metrics" };
    const userAuth = buildAuthHeader("GET", userUrl, userParams);
    const userRes = await fetch(`${userUrl}?${new URLSearchParams(userParams)}`, {
      headers: { Authorization: userAuth },
    });
    const userData = await userRes.json();

    // Get recent tweets
    const tweetsUrl = `https://api.twitter.com/2/users/${userId}/tweets`;
    const tweetsParams = { max_results: "10", "tweet.fields": "created_at,public_metrics" };
    const tweetsAuth = buildAuthHeader("GET", tweetsUrl, tweetsParams);
    const tweetsRes = await fetch(`${tweetsUrl}?${new URLSearchParams(tweetsParams)}`, {
      headers: { Authorization: tweetsAuth },
    });
    const tweetsData = await tweetsRes.json();

    const followers = userData?.data?.public_metrics?.followers_count ?? 0;
    const tweetCount = tweetsData?.meta?.result_count ?? 0;
    const totalLikes = (tweetsData?.data || []).reduce(
      (sum: number, t: { public_metrics?: { like_count?: number } }) =>
        sum + (t.public_metrics?.like_count || 0),
      0
    );
    const totalRetweets = (tweetsData?.data || []).reduce(
      (sum: number, t: { public_metrics?: { retweet_count?: number } }) =>
        sum + (t.public_metrics?.retweet_count || 0),
      0
    );

    return NextResponse.json({
      followers,
      recentTweetCount: tweetCount,
      totalLikes,
      totalRetweets,
      handle: "@Artemis_jeff",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
