import { useEffect, useState } from "react";
import type { INotification } from "../types/notification";
import { getNotifications } from "../api/notificationApi";
import { Link } from "react-router-dom";
import { FaEdit, FaHourglass, FaCheck, FaExclamation } from "react-icons/fa";
import CreateNotificationsModal from "../components/CreateNotificationsModal";

export const NotificationList = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    getNotifications().then((data) => {
      setNotifications(data);
    });
  }, []);
  
  return (
    <div className="p-4 overflow-x-auto">
      <CreateNotificationsModal />
      <table className="min-w-full border-separate border-spacing-1 border border-gray-200 shadow-sm rounded-lg">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Título
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Descrição
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Data da Audiência
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Notificado
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {notifications.map((n) => (
            <tr key={n._id} className="hover:bg-gray-200 transition-colors">
              <td className="px-4 py-2 text-sm text-gray-700">{n.titulo}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{n.descricao}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {(() => {
                  const d = new Date(n.dataAudiencia);
                  const day = d.getUTCDate().toString().padStart(2, "0");
                  const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
                  const year = d.getUTCFullYear();
                  return `${day}/${month}/${year}`;
                })()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {n.nome || "-"}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                <div
                  className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-white text-sm font-semibold ${
                    n.status === "Em Andamento"
                      ? "bg-blue-500"
                      : n.status === "Validação"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {n.status === "Em Andamento" && <FaHourglass className="mr-1" />}
                  {n.status === "Validação" && <FaExclamation className="mr-1" />}
                  {n.status === "Concluído" && <FaCheck className="mr-1" />}
                  {n.status}
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                <Link 
                  to={`/info/${n._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-yellow-300 rounded-md shadow">
                    <FaEdit className="mr-2" />
                    Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
