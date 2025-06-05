import React, { useState } from "react";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const [clientName, setClientName] = useState("");
  const [orderText, setOrderText] = useState("");
  const [view, setView] = useState("entrada"); // "entrada" o "cocina"

  const addOrder = () => {
    if (!clientName.trim() || !orderText.trim()) return;
    const newOrder = {
      id: orderNumber,
      client: clientName,
      text: orderText,
      status: "pendiente",
    };
    setOrders((prev) => [...prev, newOrder]);
    setOrderNumber(orderNumber + 1);
    setClientName("");
    setOrderText("");
  };

  const toggleStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                order.status === "pendiente"
                  ? "preparación"
                  : order.status === "preparación"
                  ? "listo"
                  : "pendiente",
            }
          : order
      )
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Comanda Digital</h1>

      {/* Botones para cambiar vista */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setView("entrada")}
          disabled={view === "entrada"}
          style={{ marginRight: 10 }}
        >
          Ingresar Pedido
        </button>
        <button onClick={() => setView("cocina")} disabled={view === "cocina"}>
          Pantalla Cocina
        </button>
      </div>

      {view === "entrada" && (
        <>
          <div style={{ marginBottom: 10 }}>
            <input
              placeholder="Nombre del cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              style={{ width: "48%", padding: 8, fontSize: 16, marginRight: "4%" }}
            />
            <input
              placeholder="Pedido"
              value={orderText}
              onChange={(e) => setOrderText(e.target.value)}
              style={{ width: "48%", padding: 8, fontSize: 16 }}
            />
          </div>
          <button onClick={addOrder} style={{ padding: "8px 16px" }}>
            Agregar pedido
          </button>
        </>
      )}

      {view === "cocina" && (
        <>
          <h2>Pedidos en Cocina</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {orders.length === 0 && <li>No hay pedidos aún.</li>}
            {orders.map((order) => (
              <li
                key={order.id}
                style={{
                  padding: 10,
                  marginBottom: 8,
                  backgroundColor:
                    order.status === "pendiente"
                      ? "#ffecb3"
                      : order.status === "preparación"
                      ? "#bbdefb"
                      : "#c8e6c9",
                  cursor: "pointer",
                  borderRadius: 4,
                }}
                onClick={() => toggleStatus(order.id)}
                title="Haz click para cambiar el estado"
              >
                <strong>Pedido #{order.id}:</strong> {order.text} <br />
                <em>Cliente: {order.client}</em> <br />
                <em>Estado: {order.status}</em>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

