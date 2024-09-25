import { columns } from "@/components/columns";
import { DataTable } from "@/components/dataTable";
import StreamViewer from "@/components/streamViewer";
import { Entry } from "@/types/entry";
import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const getEntries = unstable_cache(
    async () => {
        return await prisma.security.findMany();
    },
    [],
    { revalidate: 3600 }
);

export default async function Home() {
    const data: Entry[] = await getEntries();
    return (
        <main className="flex p-5 h-[calc(100%-44px)] flex-col items-center justify-between">
            <div className="flex gap-5 h-full w-full">
                <div className="bg-stone-900 rounded-lg min-w-fit h-full p-5">
                    <div className="grid gap-4">
                        <StreamViewer streamURL="http://localhost:8081/0/stream/" />
                        <StreamViewer streamURL="http://localhost:8081/0/motion/" />
                    </div>
                </div>
                <div className="bg-stone-900 rounded-lg w-full h-full p-5 overflow-y-scroll ">
                    <div className="max-h-full ">
                        <DataTable data={data} columns={columns} />
                    </div>
                </div>
            </div>
        </main>
    );
}
