import { NextRequest, NextResponse } from "next/server";
import { TopicMessageSubmitTransaction } from "@hashgraph/sdk";
import { getHederaClient } from "@/app/lib/hedera";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const topicId: string | undefined = body?.topicId;
    const message: string | undefined = body?.message;

    if (!topicId || !message) {
      return NextResponse.json(
        { success: false, error: "topicId and message are required" },
        { status: 400 }
      );
    }

    const client = getHederaClient();
    const submit = await new TopicMessageSubmitTransaction({ topicId, message }).execute(client);
    const receipt = await submit.getReceipt(client);

    return NextResponse.json({ success: true, status: receipt.status.toString() });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to publish message" },
      { status: 500 }
    );
  }
}



