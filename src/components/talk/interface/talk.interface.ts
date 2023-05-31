

export interface CreateTalkInput {
    title: string;
    description: string;
    link: string;
    attendees?: string[];
}

export interface UpdateTalkInput {
    title?: string;
    description?: string;
    link?: string;
    attendees?: string[];
}
  