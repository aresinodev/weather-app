import type { DayInfo } from "../interfaces/day-info.interface";

export class Formatter {
  static getInfoDays(days: any[]): DayInfo[] {
    console.log(days);
    return days.slice(1).map((day) => {
      const date = new Date(day.dt * 1000)
        .toLocaleDateString()
        .split("/")
        .slice(0, 2)
        .join("/");

      return {
        date,
        temperature: Math.round(day.temp.day),
        icon: day.weather[0].icon,
      };
    });
  }
}