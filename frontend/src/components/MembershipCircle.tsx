import styled from "styled-components";
import { Membership } from "../types/Membership";
// useState는 더 이상 필요 없습니다.
// import { useState } from "react";

const MembershipCircle = (props: {
    membershipType: Membership
}) => {
    const membershipType = props.membershipType;

    // membershipType에 따라 circleColor 값을 직접 계산합니다.
    let circleColor = "#f5a142"; // 기본값: Free 색상

    if (membershipType) {
        switch (membershipType) {
            case "Free":
                circleColor = "#f5a142"; // 주황-황토 색상
                break;
            case "Basic":
                circleColor = "#42f55d"; // 초록 계열
                break;
            case "Pro":
                circleColor = "#4299f5"; // 푸른 계열
                break;
            default:
                circleColor = "#f5a142"; // Free
        }
    }

    return (
        <Circle color={circleColor}>
        </Circle>
    )
}

const Circle = styled.span<{color: string}>`
    width: 0.75em;
    height: 0.75em;
    border-radius: 0.375em; // width/2
    background-color: ${props => props.color};
    display: inline-block;
    margin: 0 0.25em 0 0.25em;
`;

export default MembershipCircle;
