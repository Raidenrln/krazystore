import { Box, LockKeyholeOpen, ReceiptTextIcon, Store } from "lucide-react";

const Dashboard = () => {
  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Mobile devices Dashboard */}
      <div className="sm:hidden w-full items-center flex flex-col p-4 gap-4 pb-22">
        <div className="w-full text-white">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-[12px] text-(--text-muted)">
            A quick overview of your tracked stores, product and spending.
          </p>
        </div>
        {/* Store, Opened Store, Total Product, Total expenses */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full gap-4 flex bg-(--bg-panel) items-center p-4 rounded-2xl border border-[#2A2E3D]">
            <div className="w-fit h-fit p-4 bg-(--bg-button) rounded-2xl flex items-center justify-center">
              <Store className="text-(--primary-color)" />
            </div>
            <div className="flex text-white w-full justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[15px] text-[#9DAABBD]">Total stores</span>
                <span className="text-[12px] text-(--text-muted)">Tracked stores</span>
              </div>
              <span className="text-[17px]">1</span>
            </div>
          </div>
          <div className="w-full gap-4 flex bg-(--bg-panel) items-center p-4 rounded-2xl border border-[#2A2E3D]">
            <div className="w-fit h-fit p-4 bg-(--open-bg-stores) rounded-2xl flex items-center justify-center">
              <LockKeyholeOpen className="text-(--open-stores)" />
            </div>
            <div className="flex text-white w-full justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[15px] text-[#9DAABBD]">Opened stores</span>
                <span className="text-[12px] text-(--text-muted)">open right now</span>
              </div>
              <span className="text-[17px]">1</span>
            </div>
          </div>
          <div className="w-full gap-4 flex bg-(--bg-panel) items-center p-4 rounded-2xl border border-[#2A2E3D]">
            <div className="w-fit h-fit p-4 bg-(--bg-products) rounded-2xl flex items-center justify-center">
              <Box className="text-(--color-products)" />
            </div>
            <div className="flex text-white w-full justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[15px] text-[#9DAABBD]">Total Products Tracked</span>
                <span className="text-[12px] text-(--text-muted)">price records</span>
              </div>
              <span className="text-[17px]">1</span>
            </div>
          </div>
          <div className="w-full gap-4 flex bg-(--bg-panel) items-center p-4 rounded-2xl border border-[#2A2E3D]">
            <div className="w-fit h-fit p-4 bg-(--bg-expenses) rounded-2xl flex items-center justify-center">
              <ReceiptTextIcon className="text-(--color-expenses)" />
            </div>
            <div className="flex text-white justify-between w-full items-center ">
              <div className="flex flex-col">
                <span className="text-[15px] text-[#9DAABBD]">Total Expenses</span>
                <span className="text-[12px] text-(--text-muted)">5 receipts</span>
              </div>
              <span className="text-[17px]">₱50</span>
            </div>
          </div>
        </div>

        {/* Recenty visited stores, tracked products, Total spending stores */}
        <hr className="w-[95%] text-[#2A2E3D]"></hr>

        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col bg-(--bg-panel) border border-[#2A2E3D] rounded-2xl">
            <div className="text-white flex justify-between w-full p-4">
              <h1 className="text-[15px] font-bold">Recenty Visited Stores</h1>
              <span className="text-[13px] text-(--primary-color)">View all</span>
            </div>
            <div className="text-white border-t border-[#2A2E3D] w-full p-5 flex gap-2">
              <div className="flex items-center justify-center bg-(--primary-bg-color) h-12 w-12 rounded-full">
                <span className="text-(--primary-color) font-bold">K</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-semibold">Kuya Ric</span>
                <span className="text-[12px] text-(--text-muted)">Last visited Aug 26, 2026</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-(--bg-panel) border border-[#2A2E3D] rounded-2xl">
            <div className="text-white flex justify-between w-full p-4">
              <h1 className="text-[15px] font-bold">Recenty Tracked products</h1>
              <span className="text-[13px] text-(--primary-color)">View all</span>
            </div>
            <div className="text-white border-t border-[#2A2E3D] w-full p-5 flex gap-2">
              <div className="flex items-center justify-center bg-(--primary-bg-color) h-12 w-12 rounded-full">
                <span className="text-(--primary-color) font-bold">N</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-bold">Nescafe Creamy White</span>
                <span className="text-[12px] text-(--text-muted)">Kuya ric • Aug 23, 2026</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-(--bg-panel) border border-[#2A2E3D] rounded-2xl">
            <div className="text-white flex justify-between w-full p-4">
              <h1 className="text-[15px] font-bold">Recenty Expenses</h1>
              <span className="text-[13px] text-(--primary-color)">View all</span>
            </div>
            <div className="text-white border-t border-[#2A2E3D] w-full p-5 flex gap-2">
              <div className="flex items-center justify-center bg-(--primary-bg-color) h-12 w-12 rounded-full">
                <span className="text-(--primary-color) font-bold">K</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-bold">REC-000001</span>
                <span className="text-[12px] text-(--text-muted)">Aug 26, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
