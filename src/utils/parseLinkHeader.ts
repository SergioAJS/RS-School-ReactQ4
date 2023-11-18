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
    const parsed_data: ParsedData = {};

    arrData = data.split(',');

    for (const d of arrData) {
      const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(d);
      if (linkInfo) parsed_data[linkInfo[2] as keyof ParsedData] = linkInfo[1];
    }

    return parsed_data;
  }
};
