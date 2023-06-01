import { Talk } from "src/components/talk/schema/talk.schema";
import { talkStub } from "../../test/stubs/talk.stub";
import { MockModel } from "./mock.model";

export class TalkModel extends MockModel<Talk> {
    protected entityStub = talkStub()
}