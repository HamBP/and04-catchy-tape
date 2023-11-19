package com.ohdodok.catchytape.core.domain.signup

import io.kotest.core.spec.style.BehaviorSpec
import io.kotest.matchers.shouldBe

class NicknameValidationUseCaseTest : BehaviorSpec() {
    private val nicknameValidationUseCase = NicknameValidationUseCase()

    init {
        given("유효한 닉네임이 주어지고") {
            `when`("유효성을 검사하면") {
                then("Valid를 반환한다") {
                    listOf("아이유", "iu", "20", "가a1_.", "특수문자_.").forEach {
                        nicknameValidationUseCase(nickname = it) shouldBe NicknameValidationResult.VALID
                    }
                }
            }
        }

        given("비어 있는 닉네임이 주어지고") {
            `when`("유효성을 검사하면") {
                then("Empty를 반환한다") {
                    nicknameValidationUseCase(nickname = "") shouldBe NicknameValidationResult.EMPTY
                }
            }
        }

        given("짧거나 긴 닉네임이 주어지고") {
            `when`("유효성을 검사하면") {
                then("Invalid length를 반환한다") {
                    listOf("한", "닉네임을이렇게길게지으면어떡해", "a").forEach {
                        nicknameValidationUseCase(nickname = it) shouldBe NicknameValidationResult.INVALID_LENGTH
                    }
                }
            }
        }

        given("사용할 수 없는 문자가 포함된 닉네임이 주어지고") {
            `when`("유효성을 검사하면") {
                then("Invalid length를 반환한다") {
                    listOf("안 돼", "특수문자^", "특수문자*").forEach {
                        nicknameValidationUseCase(nickname = it) shouldBe NicknameValidationResult.INVALID_CHARACTER
                    }
                }
            }
        }
    }
}