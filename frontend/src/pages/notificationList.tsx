import { useEffect, useState } from "react";
import type { INotification } from "../types/notification";
import { getNotifications, getNotificationById } from "../api/notificationApi";
import { FaEdit, FaHourglass, FaCheck, FaExclamation } from "react-icons/fa";
import CreateNotificationsModal from "../components/CreateNotificationsModal";
import UpdateNotificationsModal from "../components/UpdateNotificationsModal";
import ValidateNotificationsModal from "../components/ValidateNotificationsModal";

export const NotificationList = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<INotification | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isValidateOpen, setIsValidateOpen] = useState(false);

  useEffect(() => {
    getNotifications().then((data) => {
      fetchNotifications();
      setNotifications(data);
    });
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  const handleEditClick = async (id: string) => {
    try {
      const notification = await getNotificationById(id);
      setSelectedNotification(notification);
      setIsEditOpen(true);
    } catch (error) {
      console.error("Erro ao buscar notificação:", error);
    }
  };

  const handleValidateClick = async (id: string) => {
    try {
      const notification = await getNotificationById(id);
      setSelectedNotification(notification);
      setIsValidateOpen(true);
    } catch (error) {
      console.error("Erro ao buscar notificação:", error);
    }
  };
  
  return (
    <div className="p-4 overflow-x-auto">
      {isValidateOpen && selectedNotification && (
        <ValidateNotificationsModal
          notification={selectedNotification}
          isOpen={isValidateOpen}
          onClose={() => setIsValidateOpen(false)}
          onValidated={fetchNotifications}
        />
      )}
      {isEditOpen && selectedNotification && (
        <UpdateNotificationsModal
          notification={selectedNotification}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onUpdated={fetchNotifications}
        />
      )}
      <CreateNotificationsModal onCreated={fetchNotifications}/>
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
                      ? "bg-gray-500"
                      : n.status === "Validação"
                      ? "bg-orange-500"
                      : "bg-green-600"
                  }`}
                >
                  {n.status === "Em Andamento" && <FaHourglass className="mr-1" />}
                  {n.status === "Validação" && <FaExclamation className="mr-1" />}
                  {n.status === "Concluído" && <FaCheck className="mr-1" />}
                  {n.status}
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                 {n.status === "Em Andamento" && (
                <button
                  onClick={() => handleEditClick(n._id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-yellow-300 rounded-md shadow hover:bg-yellow-400 cursor-pointer"
                >
                  <FaEdit className="mr-2" />
                  Editar
                </button>
              )}

              {n.status === "Validação" && (
                <button
                  onClick={() => handleValidateClick(n._id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow hover:bg-green-600 cursor-pointer"
                >
                  <FaCheck className="mr-2" />
                  Validar
                </button>
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
