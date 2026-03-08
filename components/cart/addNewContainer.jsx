'use client'
import { Loader, PackagePlus } from "lucide-react";
import { Suspense, useState } from "react";
import NewContainerModal from "./newContainer";
import { useLanguage } from "lib/LanguageContext";


export default function AddNewContainer({ item, isProductPage = false,callback }) {
    const [showModal, setShowModal] = useState(false);
    const { language } = useLanguage()
    const isSpanish = language === 'es'

    const t = {
        addNew: isSpanish ? "Añadir Nuevo" : "Add New",
        addNewContainer: isSpanish ? "Añadir Nuevo Contenedor" : "Add new Container"
    }

    const toggleModal = () => {
        setShowModal(prev => {
            const next = !prev;
            return next;
        });
    }
    return (
        <>
            <button
                onClick={toggleModal}
                aria-label={t.addNewContainer}
                className={`w-fit h-fit my-5 py-1.5 px-4 mx-auto rounded-md flex items-center gap-2 font-normal bg-secondary text-primary  hover:bg-secondary transition-all duration-300 ease-in cursor-pointer text-center `} >
                {t.addNew}
                <PackagePlus className="h-5 stroke-1" />
            </button>
            <Suspense fallback={<Loader />} >
                <NewContainerModal {...{ showModal, toggleModal, callback }} />
            </Suspense>
        </>
    )
}