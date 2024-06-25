import * as zod from "zod";

export const TaskValidation = zod.object({
  title: zod.string().nonempty(),
  completed: zod.boolean(),
  time: zod.date().default(() => new Date()),
});
