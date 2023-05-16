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

package cn.enaium.zensquare.repository

import cn.enaium.zensquare.model.entity.MemberProfile
import cn.enaium.zensquare.model.entity.birthday
import cn.enaium.zensquare.model.entity.input.MemberProfileInput
import cn.enaium.zensquare.model.entity.memberId
import cn.enaium.zensquare.model.entity.nickname
import org.babyfish.jimmer.spring.repository.KRepository
import org.babyfish.jimmer.sql.fetcher.Fetcher
import org.babyfish.jimmer.sql.kt.ast.expression.eq
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Repository
import java.util.*

/**
 * @author Enaium
 */
@Repository
interface MemberProfileRepository : KRepository<MemberProfile, UUID> {
    fun findByMemberId(memberId: UUID, fetcher: Fetcher<MemberProfile>? = null): MemberProfile?
    fun findAllByMemberProfile(pageable: Pageable, memberProfile: MemberProfileInput?) =
        pager(pageable).execute(sql.createQuery(MemberProfile::class) {
            if (memberProfile != null) {
                memberProfile.memberId?.let { where(table.memberId eq it) }
                memberProfile.nickname?.takeIf { it.isNotBlank() }?.let { where(table.nickname eq it) }
                memberProfile.birthday?.let { where(table.birthday eq it) }
            }
            select(table)
        })
}
