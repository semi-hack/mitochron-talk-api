import { Talk, TalkDocument } from "../../src/components/talk/schema/talk.schema";
import * as ObjectIdWrapper from "../../src/shared/classes/object-id";


export const talkStub = () => {
    return {
        title: "New Talk",
        description: "brand new description",
        link: "http://localhost:5000",
        attendees: [],
        _id: new ObjectIdWrapper.ObjectId("6477dee2350bfc910eba29c6"),
        createdAt: "2023-05-31T23:57:22.721Z",
        updatedAt: "2023-05-31T23:57:22.721Z",
        __v: 0
    }
}