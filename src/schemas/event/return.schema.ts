import { commentsRepo } from "../../repositories/";
import { arrCommentsSerializer } from "../comment/return.schema";
import { Event } from "../../entities/event.entity";

export const eventSerializer = async (event: Event) => {
  const comments: any = await commentsRepo.find({ eventId: event.id });

  return {
    id: event.id,
    title: event.title,
    owner_name: event.owner_name,
    banner_url: event.banner_url,
    icon_url: event.icon_url,
    is_remote: event.is_remote,
    description: event.description,
    average_rate: event.average_rate,
    address: event.address,
    tickets: event.tickets,
    comments: arrCommentsSerializer(comments),
  };
};
