"use client";

import React, { useRef, useEffect, useState } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import SliderComp from "./SliderComp";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";

const shipProps = {
    ship: {
        stages: [[{ id: "test" }, { id: "test2" }], [{ id: "test3" }]],
        scaleSlider: 1,
    },
    part: {
        id: null,
    },
};

const props = {
    part: shipProps.part,
    ship: shipProps.ship,
};

function Canvas() {
    const canvasRef = useRef(null);
    const partRef = useRef(null);

    const propPartRef = useRef(props.part);
    const propShipRef = useRef(props.ship);

    const [gifVisibility, setGifVisibility] = useState(false);

    const [resizePart, setResizePart] = useState(false);

    const [selection, setSelection] = useState(false);
    const selectionRef = useRef(selection);

    const [editorMode, setEditorMode] = useState("select");
    const editorModeRef = useRef(editorMode);

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        propPartRef.current = props.part;
    }, [props.part]);

    useEffect(() => {
        propShipRef.current = props.ship;
    }, [props.ship]);

    useEffect(() => {
        selectionRef.current = selection;
    }, [selection]);

    useEffect(() => {
        editorModeRef.current = editorMode;
    }, [editorMode]);

    function init() {
        const canvas = canvasRef.current;

        canvas.addEventListener("mousedown", mouseDown, false);
        canvas.addEventListener("mouseup", mouseUp, false);
        canvas.addEventListener("mousemove", mouseMove, false);
    }

    function getCursorPosition(event) {
        if (!event) return { x: 50, y: 50 };

        const rect = canvasRef.current.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return { x, y };
    }

    function mouseDown(e) {
        if (e.button === 0) {
            const cords = getCursorPosition(e);

            if (propPartRef.current.id) {
                const scaler =
                    propShipRef.current.scaleSlider * propPartRef.current.scale;

                if (cords.x < 0 || cords.x > canvasRef.current.clientWidth)
                    return;

                setGifVisibility({
                    src: "./images/spark.gif",
                    x: cords.x - propPartRef.current.width * scaler,
                    y: cords.y - propPartRef.current.height * scaler,
                });
                setTimeout(() => {
                    setGifVisibility(false);
                }, 500);

                props.partPlaced({
                    partCurrent: propPartRef.current,
                    shipCurrent: propShipRef.current,
                    x: cords.x - (propPartRef.current.width * scaler) / 2,
                    y: cords.y - (propPartRef.current.height * scaler) / 2,
                });
            } else {
                setSelection({
                    x1: cords.x,
                    y1: cords.y,
                    x2: cords.x,
                    y2: cords.y,
                });
            }
        }
    }

    function mouseUp(e) {
        if (e.button === 0) {
            setSelection(false);
            if (editorModeRef.current === "drag")
                props.handleCanvasDrag(false, propShipRef.current);
        }
    }

    function mouseMove(e) {
        if (propPartRef.current.id) {
            movePart(e);
        }

        if (selectionRef.current) {
            const cords = getCursorPosition(e);

            setSelection((prevstate) => ({
                ...prevstate,
                x2: cords.x,
                y2: cords.y,
            }));

            if (editorModeRef.current === "drag") {
                props.handleCanvasDrag(
                    {
                        x: selectionRef.current.x2 - selectionRef.current.x1,
                        y: selectionRef.current.y2 - selectionRef.current.y1,
                    },
                    propShipRef.current
                );
            }
        }
    }

    function movePart(e) {
        const cords = getCursorPosition(e);
        const scaler =
            propShipRef.current.scaleSlider * propPartRef.current.scale;

        partRef.current.style.left = `${
            cords.x - (propPartRef.current.width * scaler) / 2
        }px`;
        partRef.current.style.top = `${
            cords.y - (propPartRef.current.height * scaler) / 2
        }px`;
    }

    function isActiveBorder(uniqueId) {
        if (uniqueId === props.modifyMode)
            return `1px solid var(--third-color)`;
        return "none";
    }

    return (
        <div
            className="nooverflow"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
            }}
        >
            <div
                ref={canvasRef}
                style={{
                    display: "flex",
                    width: "100%",
                    height: "90vh",
                    position: "relative",
                    overflow: "hidden",
                }}
                onMouseDown={() => {
                    props.setModifyMode(false);
                    setResizePart(false);
                }}
            >
                {shipProps.ship.stages.flat().map((section, index) => {
                    return (
                        <React.Fragment
                            key={`editor_part_${section.id}_${index}`}
                        >
                            <img
                                src={`./images/${section.image}`}
                                onError={(e) => {
                                    e.target.src = `./images/part_404.png`;
                                }}
                                style={{
                                    position: "absolute",
                                    left: `${section.x}px`,
                                    top: `${section.y}px`,
                                    width: `${section.scaled_width}px`,
                                    border: isActiveBorder(section.uniqueId),
                                }}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    if (editorMode === "select")
                                        props.setModifyMode(section.uniqueId);
                                }}
                                className="not-selectable not-dragable"
                            />
                            <div
                                className="flex"
                                style={{
                                    position: "absolute",
                                    top: `${section.y + 25}px`,
                                    left: `${section.x + 25}px`,
                                    visibility:
                                        props.modifyMode === section.uniqueId
                                            ? "visible"
                                            : "hidden",
                                    width: "auto",
                                }}
                            >
                                {!resizePart ? (
                                    <>
                                        <div
                                            className="flex"
                                            style={{
                                                padding: "5px",
                                                backgroundColor:
                                                    "var(--primary-color)",
                                                color: "var(--fourth-color)",
                                                borderRadius: "5px",
                                                zIndex: 2,
                                            }}
                                        >
                                            <Icons.open
                                                className={cn("h-5 w-5", {
                                                    color: "var(--fourth-color)",
                                                })}
                                                onMouseDown={(e) => {
                                                    e.stopPropagation();
                                                    props.modifyPart(
                                                        props.modifyMode
                                                    );
                                                    props.setModifyMode(false);
                                                }}
                                            />
                                        </div>

                                        <div
                                            className="flex"
                                            style={{
                                                padding: "5px",
                                                backgroundColor:
                                                    "var(--primary-color)",
                                                color: "var(--fourth-color)",
                                                borderRadius: "5px",
                                                zIndex: 3,
                                            }}
                                        >
                                            <Icons.size
                                                className={cn("h-5 w-5", {
                                                    color: "var(--fourth-color)",
                                                })}
                                                onMouseDown={(e) => {
                                                    e.stopPropagation();
                                                    setResizePart(true);
                                                }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="flex"
                                        style={{
                                            padding: "5px",
                                            backgroundColor:
                                                "var(--primary-color)",
                                            color: "var(--fourth-color)",
                                            borderRadius: "5px",
                                            zIndex: 5,
                                            width: "150px",
                                        }}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        Size: {Math.round(section.scale * 100)}%
                                        <SliderComp
                                            sliderValue={[section.scale * 100]}
                                            sliderValueChanged={(value) =>
                                                props.partScaleChanged(
                                                    value / 100,
                                                    section.uniqueId
                                                )
                                            }
                                            min={20}
                                            max={150}
                                        />
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    );
                })}
                {props.part.id && (
                    <img
                        ref={partRef}
                        key={`moving_part_${props.part.id}`}
                        src={`./images/${props.part.image}`}
                        onError={(e) => {
                            e.target.src = `./images/part_404.png`;
                        }}
                        style={{
                            position: "absolute",
                            width: `${props.part.scaled_width}px`,
                            border: `1px solid var(--third-color)`,
                        }}
                    />
                )}

                <img
                    src={gifVisibility.src}
                    style={{
                        position: "absolute",
                        top: `${gifVisibility ? gifVisibility.y : 0}px`,
                        left: `${gifVisibility ? gifVisibility.x : 0}px`,
                        zIndex: 10,
                        visibility: `${gifVisibility ? "visible" : "hidden"}`,
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        visibility: `${
                            selection !== false && editorMode === "select"
                                ? "visible"
                                : "hidden"
                        }`,
                        top: `${
                            selection.y1 < selection.y2
                                ? selection.y1
                                : selection.y2
                        }px`,
                        left: `${
                            selection.x1 < selection.x2
                                ? selection.x1
                                : selection.x2
                        }px`,
                        width: `${
                            selection
                                ? Math.abs(selection.x2 - selection.x1)
                                : 0
                        }px`,
                        height: `${
                            selection
                                ? Math.abs(selection.y2 - selection.y1)
                                : 0
                        }px`,
                        border: "1px solid var(--third-color)",
                    }}
                ></div>
            </div>

            <div
                style={{
                    display: "flex",
                    width: "100%",
                    padding: "5px",
                    height: "10vh",
                }}
            >
                {/* Overall scale slider*/}
                <div
                    style={{
                        top: "5px",
                        width: "150px",
                    }}
                >
                    Size: {Math.round(props.ship.scaleSlider * 100)}%
                    <SliderComp
                        sliderValue={[props.ship.scaleSlider * 100]}
                        sliderValueChanged={(value) =>
                            props.scaleChanged(value / 100)
                        }
                        min={20}
                        max={150}
                    />
                </div>
                <div
                    style={{
                        width: "40px",
                        padding: "5px",
                        textAlign: "center",
                    }}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Icons.move
                                    className={cn("h-5 w-5", {
                                        color:
                                            editorMode === "drag"
                                                ? "var(--third-color)"
                                                : "var(--fourth-color)",
                                    })}
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        setEditorMode("drag");
                                    }}
                                />
                            </TooltipTrigger>
                            <TooltipContent>Enter dragging mode</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Icons.click
                                    className={cn("h-5 w-5", {
                                        color:
                                            editorMode === "select"
                                                ? "var(--third-color)"
                                                : "var(--fourth-color)",
                                    })}
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        setEditorMode("select");
                                    }}
                                />
                            </TooltipTrigger>
                            <TooltipContent>Enter select mode</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
}

export default Canvas;
