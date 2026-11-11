import { BowserInfo } from '@interfaces/bowser.iterface';
import * as Bowser from 'bowser';

/**
 * Función que crea una ID única
 * @returns {string} - ID única como string
 */
export const createUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  })
}

/**
 * Función que retorna la información del Browser del cliente
 * @returns {BowserInfo} Nombre del browser, sistema operativo y si es mobile como objeto
 */
export const browserInfoService = (): BowserInfo => {
  const result = Bowser.parse(window.navigator.userAgent);
  const objEvent: BowserInfo = {
    browserName: '',
    operatingSystem: '',
    isMobile: false
  }
  objEvent['browserName'] = result.browser.name || '';
  objEvent['operatingSystem'] = `${result.os.name} ${result.os.version}`;
  objEvent['isMobile'] = result.platform.type === "mobile" ? true : false;
  return objEvent;
}

/**
 * Función que crea el hash del deviceId para la marcación
 * @returns {Promise<string>} deviceId como promesa
 */
export const getDeviceId = (valIp: string): Promise<string> => {
  const generateHash = async (data: any) => {
    try {
      const jsonString = JSON.stringify(data);
      const encoder = new TextEncoder();
      const dataBytes = encoder.encode(jsonString);

      const hashBuffer = await crypto.subtle.digest("SHA-256", dataBytes);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      return hashHex;
    } catch (error) {
      console.error("Error generating hash:", error);
      throw error;
    }
  }

  const buildDeviceData = async () => {
    try {
      const deviceData = {
        language: navigator.language,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        orientation: window.screen.orientation.type,
        os: navigator?.platform || "unknown",
        nucleus: navigator.hardwareConcurrency,
        product: navigator?.product,
        colorDepth: window.screen.colorDepth,
        platform: window.navigator.platform,
        userAgent: navigator.userAgent,
        screenSize: window.screen.width + "x" + window.screen.height,
        ip: valIp,
      };
      const hash = await generateHash(deviceData);
      return hash;
    } catch (error) {
      console.error("Error generating device ID:", error);
      throw error;
    }
  }

  return buildDeviceData();
}
