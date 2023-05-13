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

import { computed, defineComponent, reactive } from "vue"
import { useQuery } from "@tanstack/vue-query"
import { api } from "@/common/ApiInstance"
import { RouterLink, useRoute } from "vue-router"
import { NCard, NList, NListItem, NSpin } from "naive-ui"
import ThreadForm from "@/components/ThreadForm"
import type { RequestOf } from "@/__generated"

const PostThread = defineComponent(
  (props: { forum?: string }) => {
    const route = useRoute()
    const options = reactive<RequestOf<typeof api.categoryController.findCategories>>({})
    const { data, isLoading } = useQuery({
      queryKey: ["categoryList"],
      queryFn: () => api.categoryController.findCategories(options)
    })

    const forum = computed(() => props.forum ?? route.params.forum ?? null)

    return () => (
      <>
        {forum.value ? (
          <ThreadForm forum={forum.value as string} />
        ) : isLoading.value ? (
          <NSpin />
        ) : (
          data.value?.content.map((category, categoryIndex) => (
            <NCard title={category.name} key={categoryIndex} segmented={{ content: true }}>
              <NList>
                {category.forums?.map((forum, forumIndex) => (
                  <NListItem key={forumIndex}>
                    <RouterLink
                      to={{
                        name: "post-thread",
                        params: { forum: forum.id }
                      }}
                    >
                      {forum.name}
                    </RouterLink>
                  </NListItem>
                ))}
              </NList>
            </NCard>
          ))
        )}
      </>
    )
  },
  {
    props: ["forum"]
  }
)

export default PostThread
