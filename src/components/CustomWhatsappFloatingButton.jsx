import { sizeFloatingIcons } from "../constants/constants"
import { getWhatsappUrl } from "../utilities/utils";
import { CustomFloatingActionButton } from "./CustomFloatingActionButton"
import { FaWhatsapp } from "react-icons/fa";

export const CustomWhatsappFloatingButton = () => {
  return (
    <CustomFloatingActionButton
        icon={<FaWhatsapp size={sizeFloatingIcons} />}
        className="bg-whatsapp text-white hover:scale-105"
        position="botton right"
        onClick={ () => window.open(getWhatsappUrl(), '_blank') }
      />
  )
}
