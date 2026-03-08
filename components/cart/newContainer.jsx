import React from "react";
import dynamic from "next/dynamic";
import { Container, SquareCheckBig } from "lucide-react";
import { addContainer } from "lib/cart/cart.core";
import { generateID } from "lib/misc";
import { useLanguage } from "lib/LanguageContext";

const Modal = dynamic(() => import("My_UI/MyModal/main"));

const CONTAINERS_EN = [
    {
        id: "20ft",
        label: "20ft Standard Container",
        meta: {
            internal: { length: 5.9, width: 2.35, height: 2.39 },
        },
    },
    {
        id: "40ft",
        label: "40ft High Cube Container",
        meta: {
            internal: { length: 12.03, width: 2.35, height: 2.69 },
        },
    },
];

const CONTAINERS_ES = [
    {
        id: "20ft",
        label: "Contenedor Standard 20ft",
        meta: {
            internal: { length: 5.9, width: 2.35, height: 2.39 },
        },
    },
    {
        id: "40ft",
        label: "Contenedor High Cube 40ft",
        meta: {
            internal: { length: 12.03, width: 2.35, height: 2.69 },
        },
    },
];

export default function NewContainerModal({ showModal, toggleModal, callback }) {
    const { language } = useLanguage()
    const isSpanish = language === 'es'
    const CONTAINERS = isSpanish ? CONTAINERS_ES : CONTAINERS_EN

    const t = {
        capacity: isSpanish ? "Capacidad" : "Capacity",
        addTo: isSpanish ? "Añadir a este contenedor" : "Add to this Container"
    }

    return (
        <Modal
            light
            open={showModal}
            onClose={toggleModal}
            noGap
            wrapperClasses="w-full max-w-lg bg-white"
            header={<div></div>}
        >
            <main className="px-4 py-4 space-y-3">
                {CONTAINERS.map((c) => {
                    const v =
                        c.meta.internal.length *
                        c.meta.internal.width *
                        c.meta.internal.height;

                    return (
                        <button
                            key={c.id}
                            aria-label={t.addTo}
                            onClick={() => [addContainer({ ...c, id: generateID() }), callback(c), toggleModal()]}
                            className="w-full border bg-primary rounded-lg p-4 flex items-center gap-4 hover:bg-accent1 transition-all ease-in duration-300"
                        >
                            <Container size={28} />
                            <div className="text-left">
                                <p className="font-medium">{c.label}</p>
                                <p className="text-xs opacity-70">
                                    {t.capacity}: {v.toFixed(2)} m³
                                </p>
                            </div>
                            <SquareCheckBig className="ml-auto opacity-30" />
                        </button>
                    );
                })}
            </main>
        </Modal>
    );
}
