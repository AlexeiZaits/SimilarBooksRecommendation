class TrieNode:
    """Узел дерева"""

    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class Trie:
    """Дерево для поиска по коллекции книг"""

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """Вставить в структуру данных строку"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search_prefix(self, prefix):
        """Поиск по строке в структуре данных"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        return self._collect_all_words(node, prefix)

    def _collect_all_words(self, node, prefix):
        """Плучить все слова"""
        words = []
        if node.is_end_of_word:
            words.append(prefix)
        for char, child_node in node.children.items():
            words.extend(self._collect_all_words(child_node, prefix + char))
        return words
