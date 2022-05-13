import { GetShowOutput, Show, SHOW_WEEKDAY } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
    private TABLE_NAME: string = "tabela_shows"

    public getShowByDayAndTime = async (
        weekDay: SHOW_WEEKDAY,
        startTime: number,
        endTime: number
    ): Promise<GetShowOutput> => {
        try {
            const result: GetShowOutput[] = await BaseDatabase.connection(this.TABLE_NAME)
                .where({ week_day: weekDay })
                .andWhere("start_time", "<", `${startTime}`)
                .orWhere("end_time", ">=", `${startTime}`)
                .andWhere("end_time", ">", `${endTime}`)
                .orWhere("start_time", "<=", `${endTime}`)


            return result[0]

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public insertShow = async (show: Show): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
                .insert({
                    id: show.getId(),
                    week_day: show.getWeekDay(),
                    start_time: show.getStartTime(),
                    end_time: show.getEndTime(),
                    band_id: show.getBandId()
                })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}