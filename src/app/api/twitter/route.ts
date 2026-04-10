import { NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  const consumerKey = process.env.TWITTER_CONSUMER_KEY;
  const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

  if (!consumerKey || !consumerSecret || !accessToken || !accessTokenSecret) {
    return NextResponse.json({ error: "Twitter credentials not configured" }, { status: 500 });
  }

  const oauth = new OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return crypto.createHmac("sha1", key).update(base_string).digest("base64");
    },
  });

  const userId = "2037743330520379393";
  const url = `https://api.twitter.com/2/users/${userId}`;
  const params = { "user.fields": "public_metrics" };
  const fullUrl = `${url}?${new URLSearchParams(params)}`;

  const requestData = { url, method: "GET" };
  const token = { key: accessToken, secret: accessTokenSecret };
  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

  try {
    const res = await fetch(fullUrl, {
      headers: {
        Authorization: authHeader.Authorization,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.errors || !data.data) {
      const errMsg = data.errors?.[0]?.message ?? data.title ?? "Twitter API error";
      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    const metrics = data.data.public_metrics ?? {};

    return NextResponse.json({
      followerCount: metrics.followers_count ?? 0,
      tweetCount: metrics.tweet_count ?? 0,
      likeCount: metrics.like_count ?? 0,
      handle: "@Artemis_jeff",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
