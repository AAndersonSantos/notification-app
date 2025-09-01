import { useState } from "react";
import type { INotification } from "../types/notification";
import { validNotification } from "../api/notificationApi";

interface Props {
  notification: INotification;
  isOpen: boolean;
  onClose: () => void;
  onValidated: () => void;
}

export default function ValidateNotificationsModal({ notification, isOpen, onClose, onValidated }: Props) {
  const [titulo, setTitulo] = useState(notification.titulo);
  const [descricao, setDescricao] = useState(notification.descricao);
  const [dataAudiencia, setDataAudiencia] = useState(notification.dataAudiencia);
  const [nome, setNome] = useState(notification.nome || "");
  const [email, setEmail] = useState(notification.email || "");
  const [telefone, setTelefone] = useState(notification.telefone || "");
  const [endereco, setEndereco] = useState(notification.endereco || "");

  const handleValidate = async (validate: boolean) => {
    try {
      await validNotification(notification._id, validate);
      onValidated();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar notificação:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-40 bg-black/60">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Necessita de informações adicionais?</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              className="w-full mt-1 p-2 border rounded-lg"
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Data da Audiência</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-lg"
              value={new Date(dataAudiencia).toISOString().split("T")[0]}
              onChange={(e) => setDataAudiencia(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Telefone</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Endereço</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              disabled
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleValidate(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Não
            </button>

            <button
              type="button"
              onClick={() => handleValidate(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Sim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
