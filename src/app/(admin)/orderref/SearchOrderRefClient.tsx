"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { generateColumns } from "@/lib/generateColumn"; 

import type { Order } from "@/types/order";
import type { Order_Item } from "@/types/order-item"; 
import type { Issue } from "@/types/issue"; 
import type { Api_log } from "@/types/api-log";
import type { Payment_log } from "@/types/payment-log"; 

interface Props {
  token: string;
}

export default function SearchOrderRefClient({ token }: Props) {
  const [orderRef, setOrderRef] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Order_Item[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [apiLogs, setApiLogs] = useState<Api_log[]>([]);
  const [paymentLogs, setPaymentLogs] = useState<Payment_log[]>([]);
  const [requestTable, setRequestTable] = useState<any[]>([]);
  const [responseTable, setResponseTable] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const orderColumns = useMemo(
    () => generateColumns<Order>(orders),
    [orders]
  );

  const orderItemColumns = useMemo(
    () => generateColumns<Order_Item>(orderItems),
    [orderItems]
  );

  const issueColumns = useMemo(
    () => generateColumns<Issue>(issues),
    [issues]
  );

  const apiLogColumns = useMemo(
    () => generateColumns<Api_log>(apiLogs),
    [apiLogs]
  );

  const paymentLogColumns = useMemo(
    () => generateColumns<Payment_log>(paymentLogs),
    [paymentLogs]
  );

  const requestColumns = useMemo(
    () => generateColumns(requestTable),
    [requestTable]
  );

  const responseColumns = useMemo(
    () => generateColumns(responseTable),
    [responseTable]
  );

  function flattenObject(
    obj: any,
    parentKey = ""
  ): Record<string, any> {

        let result: Record<string, any> = {};

        Object.entries(obj).forEach(([key, value]) => {

            const newKey = parentKey
                ? `${parentKey}.${key}`
                : key;

            if (
                value !== null &&
                typeof value === "object"
            ) {

                if (Array.isArray(value)) {

                    value.forEach((item, index) => {

                        if (
                            item !== null &&
                            typeof item === "object"
                        ) {
                            Object.assign(
                                result,
                                flattenObject(
                                    item,
                                    `${newKey}[${index}]`
                                )
                            );
                        } else {
                            result[
                                `${newKey}[${index}]`
                            ] = item;
                        }

                    });

                } else {

                    Object.assign(
                        result,
                        flattenObject(
                            value,
                            newKey
                        )
                    );

                }

            } else {

                result[newKey] = value;

            }

        });

        return result;
    }

    function convertJsonToTable(
        jsonString: string
    ) {

        try {

            const json = JSON.parse(jsonString);

            const flat = flattenObject(json);

            return Object.entries(flat).map(
                ([field, value]) => ({
                    field,
                    value,
                })
            );

        } catch {

            return [];

        }

    }   

    function parseJson(jsonString: string) {
        const json = JSON.parse(jsonString);

        const tables: Record<string, any[]> = {};

        const root: Record<string, any> = {};

        Object.entries(json).forEach(([key, value]) => {

            if (Array.isArray(value)) {
                tables[key] = value;
            }
            else if (
                typeof value === "object" &&
                value !== null
            ) {
                if (
                    Object.values(value).some(v => Array.isArray(v))
                ) {

                    const objectFields: any = {};

                    Object.entries(value).forEach(([k, v]) => {

                        if (Array.isArray(v))
                            tables[`${key}.${k}`] = v;
                        else
                            objectFields[k] = v;
                    });

                    tables[key] = [objectFields];
                }
                else {
                    tables[key] = [value];
                }
            }
            else {
                root[key] = value;
            }

        });

        tables["General"] = [root];

        return tables;
}

  const handleSearch = async () => {
    if (!orderRef.trim()) {
      alert("Please enter Order Ref");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/search-order-ref/${orderRef}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert("Order Ref not found");

        setOrders([]);
        setOrderItems([]);
        setIssues([]);
        setApiLogs([]);
        setPaymentLogs([]);

        return;
      }

      setOrders(result.data.orders ?? []);
      setOrderItems(result.data.order_items ?? []);
      setIssues(result.data.issue ?? []);
      setApiLogs(result.data.api_logs ?? []);

      const firstLog = result.data.api_logs?.[0];

      if (firstLog?.request_body) {
        setRequestTable(
        convertJsonToTable(firstLog.request_body)
      );
      } else {
        setRequestTable([]);
      }

      if (firstLog?.response_body) {
        setResponseTable(
        convertJsonToTable(firstLog.response_body)
      );
      } else {
        setResponseTable([]);
      }

      setPaymentLogs(result.data.payment_logs ?? []);

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrderRef("");

    setOrders([]);
    setOrderItems([]);
    setIssues([]);
    setApiLogs([]);
    setPaymentLogs([]);
    setRequestTable([]);
    setResponseTable([]);
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Search Order Ref
        </h1>
      </div>

      <div className="flex items-center gap-3">

        <input
          type="text"
          value={orderRef}
          onChange={(e) => setOrderRef(e.target.value)}
          placeholder="Search Order Ref..."
          className="w-96 rounded-md border border-gray-300 px-3 py-2"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Reset
        </button>

      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">
          Orders ({orders.length})
        </h2>

        <DataTable
          columns={orderColumns}
          data={orders}
        />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">
          Order Items ({orderItems.length})
        </h2>

        <DataTable
          columns={orderItemColumns}
          data={orderItems}
        />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">
          Issues ({issues.length})
        </h2>

        <DataTable
          columns={issueColumns}
          data={issues}
        />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">
          API Logs ({apiLogs.length})
        </h2>

        <DataTable
          columns={apiLogColumns}
          data={apiLogs}
        />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">
          Payment Logs ({paymentLogs.length})
        </h2>

        <DataTable
          columns={paymentLogColumns}
          data={paymentLogs}
        />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">
            Request Body
        </h2>

        <DataTable
            columns={requestColumns}
            data={requestTable}
        />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">
            Response Body
        </h2>

      <DataTable
            columns={responseColumns}
            data={responseTable}
        />
      </div>

    </div>
  );
}