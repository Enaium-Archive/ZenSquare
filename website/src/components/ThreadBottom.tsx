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

import { defineComponent, ref } from "vue"
import type { ThreadDto } from "@/__generated/model/dto"
import LikeState from "@/components/LikeState"
import { NButton, NIcon, NPopconfirm, NPopover } from "naive-ui"
import { MoreHorizontal32Filled } from "@vicons/fluent"
import { useSessionStore } from "@/store"
import { useRouter } from "vue-router"

const ThreadBottom = defineComponent(
  (props: { thread: ThreadDto["ThreadController/FULL_THREAD"]; onClickReply: () => void }) => {
    const router = useRouter()
    const session = useSessionStore()
    const showPop = ref(false)

    return () => (
      <div class={"flex justify-between"}>
        <LikeState target={props.thread.id} like={props.thread.like} />
        <NPopover
          trigger={"click"}
          onClickoutside={() => (showPop.value = false)}
          v-slots={{
            trigger: () => (
              <NButton text type={"primary"}>
                <NIcon size={32}>
                  <MoreHorizontal32Filled />
                </NIcon>
              </NButton>
            ),
            default: () =>
              // If the session id is null, then show the not login text.
              session.id == null ? (
                <div>{window.$i18n("common.notLogin")}</div>
              ) : (
                <div class={"flex gap-5 items-center"}>
                  {/*If the session id is not equal to the reply member id, then show the report button.*/}
                  {session.id != props.thread.memberId && (
                    <NButton text type={"primary"}>
                      {window.$i18n("component.button.report")}
                    </NButton>
                  )}
                  {/*If the session id is equal to the reply member id, then show the edit button.*/}
                  {session.id == props.thread.memberId && (
                    <NButton
                      text
                      type={"primary"}
                      onClick={() =>
                        router.push({
                          name: "post-thread-thread",
                          params: { forum: props.thread.forum.id, thread: props.thread.id }
                        })
                      }
                    >
                      {window.$i18n("component.button.edit")}
                    </NButton>
                  )}
                  {/*If the session id is equal to the reply member id, then show the delete button.*/}
                  {session.id == props.thread.memberId && (
                    <NPopconfirm
                      v-slots={{
                        trigger: () => (
                          <NButton text type={"primary"}>
                            {window.$i18n("component.button.delete")}
                          </NButton>
                        )
                      }}
                      onPositiveClick={() => {}}
                    />
                  )}
                  <NButton type={"primary"} text onClick={props.onClickReply}>
                    {window.$i18n("component.button.reply")}
                  </NButton>
                </div>
              )
          }}
        />
      </div>
    )
  },
  {
    props: ["thread", "onClickReply"]
  }
)

export default ThreadBottom
