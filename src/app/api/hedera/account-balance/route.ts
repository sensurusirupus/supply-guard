import { NextRequest, NextResponse } from "next/server";
import { AccountBalanceQuery, AccountId } from "@hashgraph/sdk";
import { getHederaClient } from "@/app/lib/hedera";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const accountId =
      searchParams.get("accountId") || process.env.HEDERA_OPERATOR_ID;
    if (!accountId) {
      return NextResponse.json(
        {
          success: false,
          error: "accountId query param or HEDERA_OPERATOR_ID env is required",
        },
        { status: 400 }
      );
    }

    const client = getHederaClient();
    const balance = await new AccountBalanceQuery()
      .setAccountId(AccountId.fromString(accountId))
      .execute(client);

    return NextResponse.json({
      success: true,
      accountId,
      hbars: balance.hbars.toString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to get account balance",
      },
      { status: 500 }
    );
  }
}
