"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Locale, i18n } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

type LocaleContextProviderProps = {
    children: React.ReactNode;
};

type LocaleContext = {
    lang: Locale;
    // TODO: (Vittorio) da definire il tipo del dizionario
    dictionary: Record<string, any>;
    changeLanguage: (lang: Locale) => void;
};

const LocaleContext = createContext<LocaleContext | null>(null);

export const LocaleProvider = ({ children }: LocaleContextProviderProps) => {
    const [lang, setLang] = useState<Locale>(i18n.defaultLocale);
    const [dictionary, setDictionary] = useState<Record<string, any>>({});

    const fetchDictionary = async (lang: Locale) => {
        const dictionaryData = await getDictionary(lang);
        setDictionary(dictionaryData);
    };

    useEffect(() => {
        fetchDictionary(lang);
    }, [lang]);

    const changeLanguage = async (newLang: Locale) => {
        setLang(newLang);
    };

    return (
        <LocaleContext.Provider value={{ lang, dictionary, changeLanguage }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocaleContext = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error(
            "useLocaleContext must be used within a LocaleContextProvider"
        );
    }
    return context;
};
