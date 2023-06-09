/*
 * ZenSquare is an opensource forums
 *
 * Copyright (C) 2023  Enaium
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import type { ThreadDto } from "@/__generated/model/dto"
import { defineComponent } from "vue"
import Avatar from "@/components/Avatar"
import dayjs from "dayjs"
import { NTime, NTooltip } from "naive-ui"
import { RouterLink } from "vue-router"

const Item = defineComponent(
  (props: { thread: ThreadDto["ThreadFetcher/DEFAULT_THREAD"] }) => {
    return () => (
      <div class={"flex gap-2"}>
        <Avatar
          id={props.thread.lastReplyMember?.profile?.avatar ?? props.thread.member.profile?.avatar}
          size={32}
          bordered
          round
        />
        <div class={"flex flex-col text-xs"}>
          <RouterLink to={{ name: "conversations", params: { thread: props.thread.id } }}>{props.thread.title}</RouterLink>
          <NTooltip
            placement={"right"}
            v-slots={{
              trigger: () => (
                <NTime
                  time={new Date()}
                  to={dayjs(props.thread.lastReplyTime ?? props.thread.modifiedTime).toDate()}
                  type={"relative"}
                />
              ),
              default: () => (
                <div>
                  {dayjs(props.thread.lastReplyTime ?? props.thread.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}
                </div>
              )
            }}
          />
        </div>
      </div>
    )
  },
  {
    props: ["thread"]
  }
)

export default Item
