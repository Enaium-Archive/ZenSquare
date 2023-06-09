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

import { MdEditor } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import { defineComponent, type FunctionalComponent } from "vue"
import { BASE_URL } from "@/common/ApiInstance"
import { useSessionStore } from "@/store"

const Editor = defineComponent((props) => {
  const session = useSessionStore()
  const onUpdateImage = (files: Array<File>, callback: (urls: Array<string>) => void) => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append("file", file)
    })
    //upload image
    fetch(`${BASE_URL}/images/`, {
      method: "PUT",
      body: formData,
      headers: {
        token: session.token!
      }
    })
      .then((response) => response.json())
      .then((data: Array<string>) => {
        callback(data.map((id) => `${BASE_URL}/images/${id}/`))
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return () => <MdEditor onUploadImg={onUpdateImage} {...props} />
})

export default Editor
