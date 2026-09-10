import { Eye, Trash } from "lucide-react";

const Expenses = () => {
  return (
    <main>
      <div className="sm:hidden w-full items-center flex flex-col p-4 gap-4 pb-22">
        <div className="w-full text-white">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-[12px] text-(--text-muted)">
            Tracked prices, check out, and keep every receipt.
          </p>
        </div>
        <div className="w-full bg-(--bg-panel) border border-(--border-light) rounded-2xl">
          <div className="w-full p-4 flex gap-1.5 items-center">
            <span className="font-bold text-[14px] text-white">Receipts</span>
            <div className="min-w-6 h-6 px-1 flex items-center justify-center rounded-full bg-(--primary-color) shrink-0">
              <span className="text-[10px] leading-none">1</span>
            </div>
          </div>
          <hr className="w-full border-t border-(--border-light)" />
          <div className="flex w-full justify-between p-4">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[13px] text-white">REC-0000001</span>
              <span className="text-(--text-muted) text-[12px]">
                Aug 26, 2026, 9:11 PM • 1 item{" "}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-[14px] text-white">₱16.00</span>
              <Eye size={16} className="text-(--text-muted)" />
              <Trash size={16} className="text-(--text-muted)" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Expenses;
