/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { ipcMain } from 'electron';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export const handleIPCMainRequest = (
  channel: string,
  listener: (args: any) => Promise<any>,
) => {
  ipcMain.handle(channel, async (event, args) => {
    try {
      const result = await listener(args);
      return result;
    } catch (error) {
      console.error(`Error from channel '${channel}':`, error);
      throw error;
    }
  });
};
