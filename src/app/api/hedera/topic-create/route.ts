import { NextResponse } from "next/server";
import { TopicCreateTransaction, TransactionReceipt } from "@hashgraph/sdk";
import { getHederaClient } from "@/app/lib/hedera";

export async function POST() {
  try {
    const client = getHederaClient();
    const tx = await new TopicCreateTransaction().execute(client);
    const receipt: TransactionReceipt = await tx.getReceipt(client);
    const topicId = receipt.topicId?.toString();

    return NextResponse.json({ success: true, topicId });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create topic" },
      { status: 500 }
    );
  }
}


