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

package cn.enaium.zensquare.bll.error

import cn.dev33.satoken.exception.NotLoginException
import cn.dev33.satoken.exception.NotPermissionException
import cn.enaium.zensquare.util.i18n
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException

/**
 * @author Enaium
 */
@ControllerAdvice
class GlobalExceptionAdvice(val messageSource: MessageSource) {
    @ExceptionHandler(Exception::class)
    @ResponseBody
    fun service(e: Exception): ResponseEntity<String> {
        return when (e) {
            is ServiceException -> ResponseEntity.status(e.httpStatus).body(e.message)
            is MethodArgumentTypeMismatchException -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
            is NotLoginException -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(messageSource.i18n("error.unauthorized"))

            is NotPermissionException -> ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(messageSource.i18n("error.forbidden"))

            else -> {
                e.printStackTrace()
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("")
            }
        }
    }
}