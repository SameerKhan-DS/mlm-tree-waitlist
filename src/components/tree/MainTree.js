"use client";
import React, { useEffect, useState } from "react";
import orgChartJson from "./data/org-chard.json";
import { useCenteredTree } from "./helper";
import dynamic from "next/dynamic";
import Whitelist from "./Waitlist";
import api from "@/services/api";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
const containerStyles = {
  width: "100vw",
  height: "100vh",
};

const Tree = dynamic(
  () => import("react-d3-tree").then((module) => module.default),
  { ssr: false }
);

// Here we're using `renderCustomNodeElement` render a component that uses.
// both SVG and HTML tags side-by-side.
let nodeId;
const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => {
  const handleAddNewMemberClick = (id) => {
    nodeId = id;
    // You can access the 'id' of the clicked node here
    // foreignObjectProps?.setIsPopupOpen(true);
    setTimeout(() => {
      const { setispopupopen } = foreignObjectProps;
      if (setispopupopen) {
        setispopupopen(true);
      }
    }, 1000);
    // You can perform any further actions you need with the 'id' value.
  };

  return (
    <g>
      <circle r={15}></circle>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        <div
          style={{
            border: "1px solid transparent",
            borderRadius: "5px",
            backgroundColor: "#dedede",
          }}
        >
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>

          {nodeDatum.children && (
            <>
              <button
                style={{
                  width: "75%",
                  margin: "0 auto 1rem auto",
                  display: "block",
                }}
                className="events button"
                onClick={toggleNode}
              >
                {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
              </button>
            </>
          )}
          {(nodeDatum.children?.length === 1 ||
            !nodeDatum.children?.length) && (
            <button onClick={() => handleAddNewMemberClick(nodeDatum._id)}>
              plus new members
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );
};

export default function App() {
  const [isPopUpOpen, setIsPopupOpen] = useState(false);
  useEffect(() => {
    Modal.setAppElement("#appElement"); // Replace with the actual ID of your root element
  }, []);
  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -100,
    y: -20,
    setispopupopen: setIsPopupOpen,
  };

  /**
   * TODO: Will get the left right logic from here.
   * @param {} data
   * @returns
   */
  function modifyDataStructure(data) {
    if (data.children) {
      const leftChildren = [];
      const rightChildren = [];
      const centerChildren = [];

      data.children.forEach((child, index) => {
        if (child.position === "left") {
          leftChildren.push(child);
        } else if (child.position === "right") {
          rightChildren.push(child);
        } else if (child.position === "center") {
          if (index > 0) {
            // Push "center" element to the same position as the previous element
            const previousPosition = data.children[index - 1].position;
            if (previousPosition === "left") {
              leftChildren.push(child);
            } else if (previousPosition === "right") {
              rightChildren.push(child);
            }
          } else {
            centerChildren.push(child);
          }
        }
      });

      data.children = leftChildren.concat(centerChildren, rightChildren);

      data.children.forEach((child) => {
        modifyDataStructure(child);
      });
    }

    /**
     * RND for the react-d3-tree and developed a tree for the mlm project. integrate features in the projects as per tree should be required.
     * Add on click feature in the tree and move node on the click
     */
    return data;
  }

  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [clientData, setClientData] = useState();
  const [treeFromRoot, setTreeFromRoot] = useState(null);
  const [isRender, setIsRender] = useState(false);
  // const modifiedData = modifyDataStructure(orgChartJson);

  useEffect(() => {
    const getTreeData = async () => {
      const data = await api.get("/tree");
      setClientData(data.data.Client);
    };
    getTreeData();
  }, [isRender]);
  const createTreeFromRoot = (data, rootId) => {
    const rootNode = data.find((node) => node._id === rootId);
    if (!rootNode) {
      return null;
    }

    const addedNodes = new Set();

    const addNodeToTree = (node) => {
      // If the node is already added, skip adding it again.
      if (addedNodes.has(node._id)) {
        return null;
      }
      const newNode = {
        _id: node._id,
        name: node.name,
        attributes: node.attributes,
        position: node.position,
        children: [],
      };

      if (node.children.length > 0) {
        node.children.forEach((childId) => {
          const childNode = data.find((item) => item._id === childId);
          if (childNode) {
            const childTree = addNodeToTree(childNode);
            if (childTree) {
              newNode.children.push(childTree);
              // Mark the child node as added
              addedNodes.add(childNode._id);
            }
          }
        });
      }

      // Mark the parent node as added
      addedNodes.add(node._id);
      return newNode;
    };

    const treeFromRoot = addNodeToTree(rootNode);

    return treeFromRoot;
  };

  // Example usage:
  // Assuming your data is an array of nodes, and you want to create a tree from the node with _id = "rootNodeId"
  useEffect(() => {
    // Recalculate the tree whenever clientData changes
    if (clientData) {
      const newTree = createTreeFromRoot(
        clientData,
        "656870d96063cd1431b513d8"
      );
      setTreeFromRoot(newTree);
    }
  }, [clientData]);

  return (
    <>
      <div id="appElement">
        {isPopUpOpen && (
          <Whitelist
            isPopUpOpen={isPopUpOpen}
            setIsPopupOpen={setIsPopupOpen}
            nodeId={nodeId}
            setIsRender={setIsRender}
          />
        )}
        <div>
          <button>Increment</button>
        </div>
        <div style={containerStyles} className="mt-12">
          {treeFromRoot && (
            <Tree
              data={treeFromRoot}
              onClick={() => console.log("clicked")}
              nodeSize={nodeSize}
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              pathClassFunc={() => "node__link"}
              translate={{ x: dimensions.width / 2, y: dimensions.height / 2 }}
              renderCustomNodeElement={(rd3tProps) =>
                renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
              }
              separation={{ siblings: 2, nonSiblings: 2 }}
              // initialDepth={5}
              dimensions={dimensions}
              orientation="vertical"
              zoomable={true}
              pathFunc="step"
            />
          )}
        </div>
      </div>
    </>
  );
}
