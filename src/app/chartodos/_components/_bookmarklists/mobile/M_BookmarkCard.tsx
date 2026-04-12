import { motion } from "framer-motion";
import styled from "styled-components";
import { I_BookmarkCardProps } from "../pc/BookmarkCard";
import {BookmarkCard_Commons} from "../BookmarkCard_commons";
import { ClassDatas, WorldDatas } from "@/game_datas/contentsData";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

interface I_M_BookmarkCardProps extends I_BookmarkCardProps {
    IsLeftDrag: boolean;
};

const {CardBody, ImageBox, CardDataBox} = BookmarkCard_Commons;

const Container = styled(motion.div)`
    width: 50%;
    height: 60%;
    min-width: 250px;
    max-width: 265px;
    min-height: 320px;
    max-height: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: rgb(241, 242, 246);
    box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
`;

const Bodys = styled(CardBody)``;

const CharDataBox = styled(CardDataBox)`
    width: 90%;
    min-height: 50px;
    background-color: rgb(200, 198, 198);
    padding: 2px 5px;
    border-radius: 8px;
`;

const Variants = {
    initial: (IsLeftDrag: boolean) => ({
        opacity: 0,
        x: IsLeftDrag ? 100 : -100
    }),
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.5,
            duration: 0.6
        }
    },
    exit: (IsLeftDrag: boolean) => ({
        opacity: 0,
        x: IsLeftDrag ? -100 : 100,
        transition: {
            duration: 0.5
        }
    })
};

export default function M_BookmarkCard({charname, charlevel, charclass, charimgurl, worldname, IsLeftDrag}: I_M_BookmarkCardProps){
    const WorldData = WorldDatas.find((data) => data.worldNm === worldname);
    const ClassData = ClassDatas.find((data) => data.class_fullNm === charclass);
    const router = useRouter();

    const Redirect_Charpage = (e: React.MouseEvent<HTMLDivElement>) => {
        setTimeout(() => {
            router.push(`/chartodos/${charname}`)
        }, 100);
    };

    return (
        <Container 
            variants={Variants} 
            custom={IsLeftDrag}
            initial="initial" 
            animate="animate" 
            exit={"exit"}
            transition={{
                type: "tween",
                stiffness: 300,
                damping: 30
            }}
        >
            <Bodys>
                <ImageBox>
                    <img src={charimgurl} />
                </ImageBox>
                <CharDataBox onClick={Redirect_Charpage}>
                    <div className="charnamedata">
                        <img src={`imgs/worlds/${WorldData?.worldId}.png`} />
                        <span>{charname}</span>
                    </div>
                    <div className="charclassdata">
                        <div className="charclassdata-child" id="level">{`LV.${charlevel}`}</div>
                        <div className="charclassdata-child" id="charclass">
                            <img src={`/imgs/job_icons/${ClassData?.class_category}.png`} />
                            {
                                !ClassData?.class_littleNm ? (
                                    <span>{charclass}</span>
                                ) : (
                                    <span>{`${ClassData.class_littleNm}`}</span>
                                )
                            }
                        </div>
                    </div>
                </CharDataBox>
            </Bodys>
        </Container>
    );
}