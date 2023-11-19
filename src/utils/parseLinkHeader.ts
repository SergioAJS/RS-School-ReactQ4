export interface ParsedData {
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
}

export const parseLinkHeader = (data: string | null | undefined) => {
  if (data) {
    let arrData = data.split('link:');
    data = arrData.length == 2 ? arrData[1] : data;
    const parsedData: ParsedData = {};

    arrData = data.split(',');

    for (const d of arrData) {
      const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(d);
      if (linkInfo) parsedData[linkInfo[2] as keyof ParsedData] = linkInfo[1];
    }

    return parsedData;
  }
};
