import { Cancha } from "../Models/Cancha";
import DropdownOptions from "./DropdownOptions";

const Card = ({ cancha }: { cancha: Cancha }) => {
  return (
    <div className="w-full max-w-sm  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <DropdownOptions cancha={cancha}>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </DropdownOptions>
        </button>
      </div>

      <div className="flex flex-col items-center pb-4">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={cancha.ImgURL}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium ">{cancha.Nombre}</h5>
        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.Descripcion}
          </span>
        </div>
        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Disponibilidad:
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.Disponibilidad}
          </span>
        </div>

        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Contacto:
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.Contacto}
          </span>
        </div>

        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Dimensiones:
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.Dimensiones}
          </span>
        </div>

        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Capacidad maxima:
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.CapacidadMaxima}
          </span>
        </div>

        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Direccion:
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.Direccion}
          </span>
        </div>

        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Hora apertura:
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.HoraApertura}
          </span>
        </div>

        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Hora cierre:
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.HoraCierre}
          </span>
        </div>

        <div className="flex  items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Precio:
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cancha.Precio}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Card;
