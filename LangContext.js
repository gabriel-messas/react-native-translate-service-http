import React, { createContext, useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import Api from '../Api';

export const LangContext = createContext();

export const LangContextProvider = ({ children }) => {
    const [lang, setLang] = useState('en');
	const [availableLanguages, setAvailableLanguages] = useState([]);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const loadLanguages = async () => {
			setAvailableLanguages(await Api.getLanguages());
		}
		loadLanguages();
	}, []);

    useEffect(() => {
		const deviceLanguage =
			Platform.OS === 'ios' ?
				NativeModules.SettingsManager.settings.AppleLocale ||
				NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
				: NativeModules.I18nManager.localeIdentifier;
		if (availableLanguages.includes(deviceLanguage.slice(0, 2))) {
			setLang(deviceLanguage.slice(0, 2));
		} else {
			setLang('en');
		}
		
    }, [availableLanguages]);

	useEffect(() => {
		const loadTranslation = async () => {
			translationObject = await Api.getTranslation(lang);
			setReady(true);
		}
		loadTranslation();
    }, [lang]);

    return (
        <LangContext.Provider
            value={{
                lang,
                setLang,
				ready,
            }}>
            {children}
        </LangContext.Provider>
    );
};

translationObject = {};

export const translate = (key) => {
	return key.split('.').reduce((acc, cur) => acc[cur], translationObject);
}
