interface I_OcidConfirmsProps {
    prevOcid: string;
    newOcid: string;
};

export function OcidConfirms({prevOcid, newOcid}: I_OcidConfirmsProps){
    //기존 ocid와 신규 ocid 동일한 경우
    if(prevOcid === newOcid){
        return true;
    } else {
        if(newOcid === "" || newOcid === undefined) return false;

        return false;
    };
}

/**
 * localstorage, chartodos에 저장된 ocid 최신화용 함수
 * - chartodos에 ocid 저장하는 형태로 변경하면서
 *   기존에 추가했던 chartodo data의 경우
 *   ocid의 값이 ""이거나 undefined일 가능성이 높음.
 * 
 * - 혹은 nexon open api 통해 가져온 ocid가 불변성을 가진 데이터인지
 *   검증을 하지 못한 상태이기 때문인 점도 반영
 * 
 * - chartodo에 저장된 ocid와 api 통해 가져온 ocid 데이터 비교
 *   * prevOcid === newOcid => true,
 *   * prevOcid !== newOcid => false,
 *   * newOcid === "" || newOcid === undefined => false
 * 
 * - 기존 local에 저장된 ocid는 prevOcid로 통칭
 * - api 통해 가져온 ocid는 newOcid로 통칭함.
 */