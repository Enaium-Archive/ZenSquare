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

import { NButton, NPopover } from "naive-ui"
import { Clipboard16Regular, Key16Regular } from "@vicons/fluent"
import Login from "@/pages/Login"
import { useI18n } from "vue-i18n"

const State = () => {
  const { t } = useI18n()

  return (
    <>
      <div class={"d-flex gap-2"}>
        <NPopover
          trigger={"click"}
          v-slots={{
            trigger: () => (
              <NButton renderIcon={() => <Key16Regular />} text>
                {t("component.state.login")}
              </NButton>
            ),
            default: () => <Login />,
          }}
        />
        <NButton renderIcon={() => <Clipboard16Regular />} text>
          {t("component.state.register")}
        </NButton>
      </div>
    </>
  )
}

export default State
