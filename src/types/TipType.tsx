export type tip_column_type = {
     id: number,
     column: string,
     created_at: string,
     half: string,
     match: number,
     updated_at: string,
     value: number
}

export interface Tip {
     id: number,
     user: number,
     country: number,
     league: number,
     home_team: number,
     away_team: number,
     ou_tip: tip_column_type[];
     onextwo_tip: tip_column_type[];
     dc_tip: tip_column_type[];
     bts_tip: tip_column_type[];
}