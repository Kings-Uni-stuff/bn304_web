import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        // Process the webhook payload
        console.log(payload);
        revalidatePath("/");
        if (payload.event === "motion") {
            console.log("recieved a motion event... revalidating main route");
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        return new Response(`Webhook error: ${error.message}`, {
            status: 400,
        });
    }

    return new Response("Success!", {
        status: 200,
    });
}
