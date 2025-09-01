import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { createNotification } from "../api/notificationApi";

export default function CreateNotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataAudiencia, setDataAudiencia] = useState("");

  const handleSubmit = async () => {
    try {
      const newNotification = await createNotification({
        titulo,
        descricao,
        dataAudiencia,
      });
      console.log("Notificação criada:", newNotification);

      setTitulo("");
      setDescricao("");
      setDataAudiencia("");
      setIsOpen(false);

    } catch (error) {
      console.error("Erro ao criar notificação:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 mb-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        <FaPlus />
        Criar Notificação Judicial
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center pt-40 bg-black/60">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Nova Notificação</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">Título</label>
                <input
                  required
                  type="text"
                  className="w-full mt-1 p-2 border rounded-lg"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Descrição</label>
                <textarea
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Data da Audiência
                </label>
                <input
                  required
                  type="date"
                  className="w-full mt-1 p-2 border rounded-lg"
                  value={dataAudiencia}
                  onChange={(e) => setDataAudiencia(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
