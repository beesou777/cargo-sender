/*
  Warnings:

  - A unique constraint covering the columns `[order_code]` on the table `UserOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[revolut_order_id]` on the table `UserOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserOrder_order_code_key" ON "UserOrder"("order_code");

-- CreateIndex
CREATE UNIQUE INDEX "UserOrder_revolut_order_id_key" ON "UserOrder"("revolut_order_id");
