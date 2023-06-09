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

import { NButton, NButtonGroup, NModal } from "naive-ui"
import CategoryList from "@/components/CategoryList"
import { Flash16Regular, NotepadEdit16Regular } from "@vicons/fluent"
import { ref } from "vue"
import { useRouter } from "vue-router"
import SelectForum from "@/views/SelectForum"

const showPostThread = ref(false)

const Forums = () => {
  const router = useRouter()

  return (
    <>
      <div class={"flex justify-between mt-5"}>
        <div>{window.$i18n("component.menu.forums")}</div>
        <div>
          <NButtonGroup>
            <NButton
              renderIcon={() => <Flash16Regular />}
              type={"primary"}
              onClick={() => router.push({ name: "whats-new" })}
            >
              {window.$i18n("view.forums.newPost")}
            </NButton>
            <NButton
              renderIcon={() => <NotepadEdit16Regular />}
              type={"warning"}
              onClick={() => (showPostThread.value = true)}
            >
              {`${window.$i18n("view.forums.newThread")}...`}
            </NButton>
          </NButtonGroup>
        </div>
      </div>
      <div class={"mt-5"} />
      <CategoryList />
      <NModal
        v-model:show={showPostThread.value}
        preset={"dialog"}
        onClose={() => (showPostThread.value = false)}
        v-slots={{
          header: () => <div>{window.$i18n("view.forums.newThread")}</div>,
          default: () => <SelectForum />
        }}
      />
    </>
  )
}

export default Forums
