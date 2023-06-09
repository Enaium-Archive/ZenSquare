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

import { defineComponent } from "vue"
import { NPagination } from "naive-ui"
import type { Page } from "@/__generated/model/static"

const Pagination = defineComponent(
  (props: { page: Page<any>; changePage: number }, context) => {
    // 1. Define a function to update the page number when a page is changed
    const onUpdatePage = (page: number) => {
      // 2. Emit the page number to the parent component
      context.emit("update:change", page - 1)
    }
    return () => (
      // 3. Use the NPagination component and bind the page number, total page number and page size
      <NPagination
        onUpdate:page={onUpdatePage}
        page={props.page!.number + 1}
        pageCount={props.page!.totalPages}
        pageSize={props.page!.size}
      />
    )
  },
  {
    props: ["page", "changePage"],
    // 4. Emit the page number to the parent component
    emits: ["update:change"]
  }
)

export default Pagination
