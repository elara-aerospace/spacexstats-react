import settings from 'settings';
import { chartColors } from 'stylesheet';
import { ChartOptions } from 'chart.js';
import deepmerge from 'deepmerge';
import { Launch, Launchpad } from 'types';

export const buildLaunchesPerLaunchpadChart = (pastLaunches: Launch[]) => {
  const launchesPerRocket = {
    'Kwajalein Atoll': pastLaunches.filter(
      ({ launchpad }) => launchpad === Launchpad.kwajalein,
    ).length,
    'Vandenberg AFB SLC 4E': pastLaunches.filter(
      ({ launchpad }) => launchpad === Launchpad.vafb,
    ).length,
    'Cape Canaveral SLC 40': pastLaunches.filter(
      ({ launchpad }) => launchpad === Launchpad.slc40,
    ).length,
    'KSC Historic LC 39A': pastLaunches.filter(
      ({ launchpad }) => launchpad === Launchpad.lc39a,
    ).length,
    'Boca Chica, Texas': 0,
  };

  const data = {
    labels: Object.keys(launchesPerRocket),
    datasets: [
      {
        data: Object.values(launchesPerRocket),
        backgroundColor: [
          chartColors.green,
          chartColors.blue,
          chartColors.yellow,
          chartColors.orange,
          chartColors.grey,
        ],
      },
    ],
  };

  const customOptions: ChartOptions = {};
  const options = deepmerge(settings.DEFAULTCHARTOPTIONS, customOptions);

  return { data, options };
};
