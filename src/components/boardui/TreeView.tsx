import { useState } from "react";

export interface TreeNode {
  id: string;
  label: string;
  badge?: string;
  children?: TreeNode[];
}

function TreeItem({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = Boolean(node.children && node.children.length > 0);

  return (
    <div className="font-mono text-xs">
      <div
        className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-neutral-900/50 transition-colors"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="w-4 h-4 grid place-items-center text-neutral-500 hover:text-white"
          >
            {expanded ? "▾" : "▸"}
          </button>
        ) : (
          <span className="w-4 h-4 grid place-items-center text-neutral-600">·</span>
        )}

        <span className="text-neutral-200">{node.label}</span>

        {node.badge && (
          <span className="ml-auto inline-flex items-center rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.2 text-[10px] text-neutral-400">
            {node.badge}
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="border-l border-neutral-800/80 ml-4">
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({
  nodes,
  className = "",
}: {
  nodes: readonly TreeNode[];
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-neutral-800 bg-neutral-950 p-3 ${className}`}>
      {nodes.map((node) => (
        <TreeItem key={node.id} node={node} />
      ))}
    </div>
  );
}
