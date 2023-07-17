declare module "aapl.json" {
  export default {
    date: string,
    close: number,
  };
}

declare module "unemployment.json" {
  export default {
    id: number,
    state: string,
    county: string,
    rate: number,
  };
}

declare module "dataForce.json" {
  export default {
    nodes:
      {
        id: string,
        group: string,
        radius: number,
        // eslint-disable-next-line camelcase
        citing_patents_count: number,
      } |
      {
        id: string,
        group: string,
        radius: undefined,
        // eslint-disable-next-line camelcase
        citing_patents_count: undefined,
      },
    links: {
      source: string,
      target: string,
      value: number,
    },
  };
}
